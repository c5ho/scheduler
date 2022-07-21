/*
  We are rendering `<Application />` down below, so we need React.createElement
*/
import React from "react";

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
  queryByText
} from "@testing-library/react";

// We import the component that we are testing
import Application from "components/Application";

// This test block is for the Application component
describe("Application", () => {

  // For reference, this test is the same as the next one, but uses Promise syntax
  xit("defaults to Monday and changes the schedule when a new day is selected", () => {
    const { getByText } = render(<Application />);
    
    return waitForElement(() => getByText("Monday")).then(() => {
      fireEvent.click(getByText("Tuesday"));
      expect(getByText("Leopold Silvers")).toBeInTheDocument();
    });
  });
  
  xit("changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);
    
    await waitForElement(() => getByText("Monday"));
    
    fireEvent.click(getByText("Tuesday"));
    
    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });
  
  it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
    const { container, debug } = render(<Application />);
  
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
  
    // if string not found, getBy will throw useful error to say string not found, queryBy would return null value
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));
    
    expect(getByAltText(appointment, "Edit"));
    expect(getByAltText(appointment, "Delete"));

    const day = getAllByTestId(container, "day").find(day =>
    // use queryBy here to return null if node not found, getBy will throw error if "Monday" not found
      queryByText(day, "Monday")
    );
  
    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  });

})