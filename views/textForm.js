import React from "react";

export default class TextForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };
  }
  render() {
    return (
      <form
        onSubmit={(event) => {
          console.log("Submitting field value: ", this.state.value);
          event.preventDefault();
          this.setState({ value: "" });
          this.props.onSubmit(this.state.value);
        }}
      >
        <input
          type="text"
          value={this.state.value}
          onChange={(event) => this.setState({ value: event.target.value })}
          placeholder={this.props.placeholder}
        />
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
