import React from "react"; 

/* Stateless component */
const Screen = (props) => {
  return (
    <div id="screen" className="text-white">
      <div
        className="topScreen d-flex justify-content-between align-items-center"
        style={{ minHeight: 20 }}
      >
        <button
          data-toggle="tooltip"
          data-placement="left"
          class="bg-transparent border-0 p-0"
          title="History"
        >
          <i
            className="fas fa-history text-white"
            data-toggle="modal"
            data-target="#historyModal"
          ></i>
        </button>
        <p class="m-0 h6 text-warning">{props.exp}</p>
      </div>

      <h1 id="display" class="m-0 text-right">
        {props.val}
      </h1>
    </div>
  );
};

export default Screen;