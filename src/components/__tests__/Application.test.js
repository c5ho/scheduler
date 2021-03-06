// We are rendering `<Application />` down below, so we need React.createElement
import React from "react";
import axios from "axios";

// We import our helper functions from the react-testing-library
// The render function allows us to render Components
import { 
  render, 
  waitForElement, 
  fireEvent, 
  getAllByTestId, 
  getByText, 
  prettyDOM, 
  getByAltText,
  getByPlaceholderText,
  queryByText,
  queryByAltText
} from "@testing-library/react";

// We import the component that we are testing
import Application from "components/Application";

// This test block is for the Application component
describe("Application", () => {

  // For reference, this test is the same as the next one, but uses Promise syntax
  it("defaults to Monday and changes the schedule when a new day is selected", () => {
    const { getByText } = render(<Application />);
    
    return waitForElement(() => getByText("Monday")).then(() => {
      fireEvent.click(getByText("Tuesday"));
      expect(getByText("Leopold Silvers")).toBeInTheDocument();
    });
  });
  
  it("changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);
    
    await waitForElement(() => getByText("Monday"));
    
    fireEvent.click(getByText("Tuesday"));
    
    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });
  
  it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
    // 1. Render the Application.
    const { container, debug } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));
  
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];

    // 3. Click the "Add" button on the first empty appointment.
    fireEvent.click(getByAltText(appointment, "Add"));
    
    // 4. Enter the name "Lydia Miller-Jones" into the input with the placeholder "Enter Student Name".
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    
    // 5. Click the first interviewer in the list.
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    
    // 6. Click the "Save" button on that same appointment.
    fireEvent.click(getByText(appointment, "Save"));
  
    // 7. Check that the element with the text "Saving" is displayed.
    expect(getByText(appointment, "Saving")).toBeInTheDocument();
  
    // 8. Wait until the element with the text "Lydia Miller-Jones" is displayed.
    // if string not found, getBy will throw useful error to say string not found, queryBy would return null value
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));
    
    // Check for Edit/Delete to confirm in SHOW mode
    expect(getByAltText(appointment, "Edit"));
    expect(getByAltText(appointment, "Delete"));

    // 9. Check that the DayListItem with the text "Monday" also has the text "no spots remaining".
    const day = getAllByTestId(container, "day").find(day =>
    // use queryBy here to return null if node not found, getBy will throw error if "Monday" not found
      queryByText(day, "Monday")
    );
    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  });

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    // 1. Render the Application.
    const { container } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[1];
    
    // 3. Click the "Delete" button on the booked appointment.
    fireEvent.click(getByAltText(appointment, "Delete"));

    // 4. Check that the confirmation message is shown.
    expect(getByText(appointment, /are you sure you want to delete this appointment?/i));

    // 5. Click the "Confirm" button on the confirmation.
    fireEvent.click(getByText(appointment, 'Confirm'));

    // 6. Check that the element with the text "Deleting" is displayed.
    expect(getByText(appointment, 'Deleting')).toBeInTheDocument();

    // 7. Wait until the element with the "Add" button is displayed.
    await waitForElement(() => getByAltText(appointment, "Add"));

    // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
    const day = getAllByTestId(container, 'day').find(day => queryByText(day, "Monday"));
    expect(getByText(day, '2 spots remaining')).toBeInTheDocument();
  });

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    // 1. Render the Application.
    const { container } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[1];
    
    // 3. Click the "Edit" button on the booked appointment.
    fireEvent.click(getByAltText(appointment, "Edit"));

    // 4. Enter a new studenty name.
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), { 
      target: { value: 'Calvin Hobbes' } });

    // 5. Select an interviewer
    fireEvent.click(getByAltText(appointment, 'Sylvia Palmer'));

    // 6. Click on "Save".
    fireEvent.click(getByText(appointment, 'Save'));

    // 7. Expect to see "Saving" status.
    expect(getByText(appointment, 'Saving')).toBeInTheDocument();

    // 8. Wait until the text "Calvin Hobbes" is displayed.
    await waitForElement(() => getByText(appointment, 'Calvin Hobbes'));

    // 9. Check that the DayListItem with the text "Monday" also has the text "1 spots remaining".    
    const day = getAllByTestId(container, 'day').find(day => queryByText(day, "Monday"));
    expect(getByText(day, '1 spot remaining')).toBeInTheDocument();
  })
  
  it("shows the save error when failing to save an appointment", async () => {
    axios.put.mockRejectedValueOnce();
    
    const { container } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));
    
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[1];

    fireEvent.click(getByAltText(appointment, 'Edit'));
    fireEvent.click(getByText(appointment, 'Save'));


    expect(getByText(appointment, 'Saving')).toBeInTheDocument();

    await waitForElement(() => getByText(appointment, 'Error'));

    expect(getByText(appointment, 'Unable to Save')).toBeInTheDocument();
  });

  it("returns to EDIT mode when failing to save an appointment from EDIT", async () => {
    axios.put.mockRejectedValueOnce();
    
    const { container } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));
    
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[1];

    fireEvent.click(getByAltText(appointment, 'Edit'));
    fireEvent.click(getByText(appointment, 'Save'));


    expect(getByText(appointment, 'Saving')).toBeInTheDocument();

    await waitForElement(() => getByText(appointment, 'Error'));

    expect(getByText(appointment, 'Unable to Save')).toBeInTheDocument();
    
    fireEvent.click(getByAltText(appointment, 'Close'));

    // Check for Cancel/Save to confirm in EDIT mode
    expect(getByText(appointment, "Cancel"));
    expect(getByText(appointment, "Save"));

  });

  it("returns to CREATE mode when failing to save an appointment from CREATE", async () => {
    axios.put.mockRejectedValueOnce();
    
    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];

    fireEvent.click(getByAltText(appointment, "Add"));
    
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    
    fireEvent.click(getByText(appointment, "Save"));

    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    await waitForElement(() => getByText(appointment, 'Error'));

    expect(getByText(appointment, 'Unable to Save')).toBeInTheDocument();
    
    fireEvent.click(getByAltText(appointment, 'Close'));

    // Check for Cancel/Save to confirm in CREATE mode
    expect(getByText(appointment, "Cancel"));
    expect(getByText(appointment, "Save"));

  });

  it("shows the delete error when failing to delete an existing appointment", async () => {
    axios.delete.mockRejectedValueOnce();
    
    const { container } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));
    
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[1];

    fireEvent.click(getByAltText(appointment, 'Delete'));
    fireEvent.click(getByText(appointment, 'Confirm'));


    expect(getByText(appointment, 'Deleting')).toBeInTheDocument();

    await waitForElement(() => getByText(appointment, 'Error'));

    expect(getByText(appointment, 'Unable to Delete')).toBeInTheDocument();
  });

  it("returns to SHOW mode failing to delete an existing appointment", async () => {
    axios.delete.mockRejectedValueOnce();
    
    const { container } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));
    
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[1];

    fireEvent.click(getByAltText(appointment, 'Delete'));
    fireEvent.click(getByText(appointment, 'Confirm'));

    expect(getByText(appointment, 'Deleting')).toBeInTheDocument();

    await waitForElement(() => getByText(appointment, 'Error'));

    expect(getByText(appointment, 'Unable to Delete')).toBeInTheDocument();

    fireEvent.click(getByAltText(appointment, 'Close'));

    expect(getByText(appointment, 'Archie Cohen')).toBeInTheDocument();
  });
})