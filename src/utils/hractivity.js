function correctTitle(title) {
  switch (title) {
    case "list_of_page_enter":
      return "Visited Pages";
    case "list_of_duration_in_second":
      return "Time on page";
    case "list_of_action":
      return "User Actions";
    default:
      return title;
  }
}

function correctActionName(action) {
  switch (action) {
    case "Census Create":
      return "Census Create";
    case "Census Detail":
      return "Member details";
    case "Census Detail (view only)":
      return "Member details (view only)";
    case "Census Create Family":
      return "Add dependent";
    case "share":
      return "Shared Documents";
    default:
      return action;
  }
}

export { correctTitle, correctActionName };
