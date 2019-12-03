import React from "react"
import { render, cleanup, waitForElement, getByText, prettyDOM, getAllByTestId, getByAltText, getByPlaceholderText } from "@testing-library/react"
import { fireEvent } from "@testing-library/react";
import Application from "../Application"
// import axios from "axios";
// ===== PLEASE NOTE: BOTH DB AND MAIN SERVERS MUST BE RUNNING IN-ORDER FOR THE TEST TO PASS
afterEach(cleanup)
// jest.mock('axios');

// jest.mock("/Users/dasha/lighthouse/REACT/scheduler/src/__mocks__ /axios.js")
// // /Users/dasha/lighthouse/REACT/scheduler/src/__mocks__ /axios.js
describe("Application", () => {
  it("changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);
  
    await waitForElement(() => getByText("Monday"));
  
    fireEvent.click(getByText("Tuesday"));
  
    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });

  // it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
  //   const { container } = render(<Application />);
  
  //   await waitForElement(() => getByText(container, "Archie Cohen"));
  
  //   const appointments = getAllByTestId(container, "appointment");
  //   const appointment = appointments[0];
  
  //   fireEvent.click(getByAltText(appointment, "Add"));
  
  //   fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
  //     target: { value: "Lydia Miller-Jones" }
  //   });

  //   fireEvent.click(getByAltText(appointment, "Samantha Stanic"));
  
  //   fireEvent.click(getByText(appointment, "Save"));
  
  //   console.log(prettyDOM(appointment));
  // });

});

//"Jamal Jordan" "Samantha Stanic"