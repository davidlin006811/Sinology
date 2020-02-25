import React from "react";

const ResourceItems = props => {
  let resourceList = props.resource.rows.map((item, index) => {
    let bgColor =
      index % 2 === 0
        ? { backgroundColor: "#fff" }
        : { backgroundColor: "#f2f3f8" };
    return (
      <tr key={item.id} style={bgColor}>
        <td
          style={{
            width: "20%",
            textAlign: "center"
          }}
        >
          {item.id}{" "}
        </td>
        <td style={{ width: "80%" }}>
          <p style={{ paddingLeft: "10px" }}>{item.title}</p>
        </td>
      </tr>
    );
  });
  return (
    <div id="resource" className="clearDiff">
      <h3>
        {props.resource.cate_title}
        <a href="#menuTag" className="return-link">
          返回上級<i className="fa fa-angle-double-up"></i>
        </a>
      </h3>

      <table style={{ fontSize: "13px" }}>
        <thead>
          <tr
            style={{
              backgroundColor: "#00a9c7",
              color: "#fff",
              height: "30px",
              padding: "0 5px",
              textAlign: "center"
            }}
          >
            <td style={{ width: "20%" }}>序號</td>

            <td style={{ width: "80%" }}>課程名稱</td>
          </tr>
        </thead>
        <tbody>{resourceList}</tbody>
      </table>
    </div>
  );
};
export default ResourceItems;
