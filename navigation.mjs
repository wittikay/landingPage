// Keep dialog dismissal and onward navigation focus in one place.
export function focusAfterStoryClose(opener, destination = null) {
  if (destination) {
    destination.tabIndex = -1;
    destination.focus({ preventScroll: true });
    destination.scrollIntoView({ block: 'start' });
  } else {
    opener?.focus();
  }
}
