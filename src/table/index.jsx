import {
  Cell,
  Column,
  Row,
  TableBody,
  TableHeader,
  TableView
} from "@react-spectrum/table";

import EmptyState from "components/EmptyState";
import React, { useState } from "react";
import { defaultCellRender } from "utils/cellFormatting";

const MIN_COLUMN_WIDTH = 100;

const DataTable = (props) => {
  const {
    columns,
    primaryKeyName,
    list,
    cellRender = defaultCellRender
  } = props;

  const [columnByKey] = useState(() => {
    const obj = {};
    for (let i = 0; i < columns.length; i++) {
      const { key } = columns[i];
      obj[key] = columns[i];
    }
    return obj;
  });

  const doRenderCell = (key, item, cellRender) => {
    const hasKeyProperty = Object.prototype.hasOwnProperty.call(
      columnByKey,
      key
    );
    if (
      hasKeyProperty &&
      Object.prototype.hasOwnProperty.call(columnByKey[key], "cellRender")
    ) {
      const renderFunciton = columnByKey[key].cellRender;
      if (typeof renderFunciton === "function") {
        return renderFunciton(key, item);
      }
    }
    return cellRender(key, item);
  };

  return (
    <TableView
      renderEmptyState={() => <EmptyState />}
      aria-label="Table with reporting data"
      width="auto"
      height="size-6000"
      UNSAFE_style={{ overflowX: "auto" }}
    >
      <TableHeader columns={columns}>
        {(column) => {
          const columnProps = {
            ...(column?.width && { width: column.width }),
            ...(column?.minWidth && { minWidth: column.minWidth }),
            ...(column?.maxWidth && { maxWidth: column.maxWidth }),
            ...(column?.defaultWidth && {
              defaultWidth: column.defaultWidth
            })
          };
          if (!Object.keys(columnProps).length) {
            columnProps["width"] = MIN_COLUMN_WIDTH;
          }

          const align = column?.align ?? "start";

          return (
            <Column
              {...columnProps}
              childColumns={column.children}
              align={align}
            >
              {column.name}
            </Column>
          );
        }}
      </TableHeader>
      <TableBody
        items={list.items}
        loadingState={list.loadingState}
        onLoadMore={list.loadMore}
      >
        {(item) => {
          return (
            <Row key={item[primaryKeyName]}>
              {(key) => <Cell>{doRenderCell(key, item, cellRender)}</Cell>}
            </Row>
          );
        }}
      </TableBody>
    </TableView>
  );
};

export default DataTable;
