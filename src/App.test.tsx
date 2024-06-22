import { render } from "@solidjs/testing-library";
import userEvent from "@testing-library/user-event";
import { test, expect, vi } from "vitest";
import { createSignal } from "solid-js";
import App from "./App";
import { useAuth } from "./hooks/useAuth";

const user = userEvent.setup();

vi.mock('./hooks/useAuth');

test("increments value", async () => {
  const userMock = vi.fn();
  const logInMock = vi.fn();
  const logOutMock = vi.fn();

  vi.mocked(useAuth).mockReturnValue({ user: userMock, loading: () => false, error: () => "", logIn: logInMock, logOut: logOutMock });

  const { getByText } = render(() => <App />);
  const counter = getByText('count is 0');
  expect(counter).toHaveTextContent("0");
  await user.click(counter);
  expect(counter).toHaveTextContent("1");
});

test("logs in and logs out", async () => {
  const [currentUser, setCurrentUser] = createSignal(null);

  const userMock = vi.fn(() => currentUser());
  const logInMock = vi.fn(() => setCurrentUser({ email: 'hallo' }));
  const logOutMock = vi.fn(() => setCurrentUser(null));

  vi.mocked(useAuth).mockReturnValue({ user: userMock, loading: () => false, error: () => "", logIn: logInMock, logOut: logOutMock });

  const { findByText, getByText } = render(() => <App />);
  const logInButton = getByText('Log in');

  await user.click(logInButton);
  expect(logInMock).toHaveBeenCalled();
  expect(await findByText('User IS logged in')).toBeInTheDocument();

  const logOutButton = getByText('Log Out');
  await user.click(logOutButton);
  expect(logOutMock).toHaveBeenCalled();
  expect(getByText('User NEEDS to be logged in')).toBeInTheDocument();
});