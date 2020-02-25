import React from "react";
import { createContentMarkup } from "../../common";
const StaffItems = props => {
  return (
    <div id="staff" className="clearDiff">
      <h3>{props.staff.cate_title}</h3>

      <div>
        <div
          dangerouslySetInnerHTML={createContentMarkup(
            props.staff.rows.content
          )}
        />
      </div>
    </div>
  );
};
export default StaffItems;
