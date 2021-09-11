import React from "react";

/* Stateless component */
const HistoryModal = (props) => {
  return (
    <div className="modal" tabindex="-1" role="dialog" id="historyModal">
      <div className="modal-dialog shadow-lg text-dark" role="document">
        <div class="modal-content">
          <div className="modal-header shadow-sm">
            <h4 className="modal-title">History</h4>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
              data-toggle="tooltip"
              data-placement="left"
              title="Close"
            >
              <span class="h2" aria-hidden="true">
                &times;
              </span>
            </button>
          </div>

          <div className="modal-body text-center bg-light">
            {props.history.length === 0 ? (
              <p className="h5 m-0">Nothing to display at this time</p>
            ) : (
              props.history.map((exp, i) => {
                return (
                  <div
                    className="exp d-flex justify-content-between align-items-center"
                    id={i}
                  >
                    <p className="m-0" key={i}>
                      {exp}
                    </p>

                    <i
                      className="fas fa-trash"
                      data-exp={exp}
                      onClick={props.remove}
                    ></i>
                  </div>
                );
              })
            )}
          </div>

          <div className="modal-footer shadow-sm">
            <button
              type="button"
              className="btn btn-primary"
              data-toggle="tooltip"
              data-placement="top"
              title="Clear"
              onClick={props.clear}
            >
              Clear
            </button>

            <button
              type="button"
              className="btn btn-danger"
              data-dismiss="modal"
              data-toggle="tooltip"
              data-placement="top"
              title="Close"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryModal;