import React from "react";
import { ActionGroup, Item } from "@adobe/react-spectrum";
import DocumentFragmentGroup from "@spectrum-icons/workflow/DocumentFragmentGroup";

function Example() {
  let [action, setAction] = React.useState();

  return (
    <>
      <ActionGroup onAction={setAction}>
        <Item key="add">Add</Item>
        <Item key="delete">Delete</Item>
        <Item key="edit">Edit</Item>
      </ActionGroup>
      <p>Action: {action}</p>
    </>
  );
}

export default Example;
