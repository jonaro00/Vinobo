import React from "react";
import styles from "../styles/TextForm.module.css";

export default class TextForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };
  }
  render() {
    return (
      <form
        onSubmit={(event) => {
          event.preventDefault();
          this.setState({ value: "" });
          this.props.onSubmit(this.state.value);
        }}
      >
        <input
          className={styles.textInput}
          type="text"
          value={this.state.value}
          onChange={(event) => this.setState({ value: event.target.value })}
          placeholder={this.props.placeholder}
        />
        <input type="submit" value={this.props.submitValue} />
      </form>
    );
  }
}
