/**
 * When the document is ready, make the modal static and uncloseable, then open it.
 * @param action - "show" or "hide"
 */
const MODAL_ACTION = (action) => {
  $(document).ready(() => {
    $(".modal").modal({ backdrop: "static", keyboard: false });
    $(".modal").modal(action);
  });
};

/* It creates a button that when clicked, opens a modal and populates the modal's inputs with the row's
data */
class modalRenderer {
  init(params) {
    this.params = params;

    let template = '<span><button id="modalBtn" class="btn btn-dark">✎</button><span id="theValue"></span></span>';
    let tempDiv = document.createElement("div");

    tempDiv.innerHTML = template;
    this.eGui = tempDiv.firstElementChild;
    let eValue = this.eGui.querySelector("#theValue");
    eValue.innerHTML = " " + params.value;
    this.eButton = this.eGui.querySelector("#modalBtn");
    this.buttonClickListener = () => this.onButtonClicked();
    this.eButton.addEventListener("click", this.buttonClickListener);
  }

  onButtonClicked() {
    let rowNode = gridOptions.api.getModel().rowsToDisplay[this.params.node.rowIndex];
    let form = document.querySelectorAll("form");
    let inputs = document.querySelectorAll(".required-inputs");

    MODAL_ACTION("show");

    // Insert row values to the inputs
    inputs.forEach((item) => {
      item.value = rowNode.data[item.name];
    });

    // Remove event to avoid nasty bugs
    $(form).off("submit");

    $(form).submit(() => {
      let formData = Array.from(inputs).reduce((acc, input) => ({ ...acc, [input.name]: input.value }), {});

      if (confirm("Save Changes?")) {
        rowNode.setData(formData);
        MODAL_ACTION("hide");
      }
    });
  }
  getGui() {
    return this.eGui;
  }
  refresh() {
    return false;
  }
  destroy() {
    this.eButton.removeEventListener("click", this.buttonClickListener);
  }
}
