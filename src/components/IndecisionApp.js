import React, { Component } from "react";
import Action from "./Action";
import AddOption from "./AddOption";
import Header from "./Header";
import OptionModal from "./OptionModal";
import Options from "./Options";

export class IndecisionApp extends Component {
  state = {
    options: this.props.options,
    selectedOption: undefined,
  };

  componentDidMount = () => {
    try {
      const json = localStorage.getItem("options");
      const options = JSON.parse(json);

      if (options) {
        this.setState(() => {
          return {
            options,
          };
        });
      }
    } catch (e) {}
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (prevState.options.length !== this.state.options.length) {
      const json = JSON.stringify(this.state.options);
      localStorage.setItem("options", json);
    }
  };

  componentWillUnmount = () => {
    console.log("componentWillUnmount");
  };

  handleDeleteOptions = () => {
    this.setState(() => {
      return {
        options: [],
      };
    });
  };

  handleDeleteOption = (optionToRemove) => {
    this.setState((prevState) => {
      return {
        options: prevState.options.filter((option) => {
          return option !== optionToRemove;
        }),
      };
    });
  };

  handlePick = () => {
    const randomNum = Math.floor(Math.random() * this.state.options.length);
    const option = this.state.options[randomNum];
    this.setState((prevState) => {
      return {
        ...prevState,
        selectedOption: option,
      };
    });
  };

  handleClearSelectedOption = () => {
    this.setState((prevState) => {
      return {
        ...prevState,
        selectedOption: undefined,
      };
    });
  };

  handleAddOption = (option) => {
    if (!option) {
      return "Enter valid value to add item";
    } else if (this.state.options.indexOf(option) > -1) {
      return "This option already exists";
    }
    this.setState((prevState) => {
      return {
        options: [...prevState.options, option],
      };
    });
  };

  render() {
    const subtitle = "Put your life in the hands of a computer";

    return (
      <div>
        <Header subtitle={subtitle} />
        <div className="container">
          <Action
            handlePick={this.handlePick}
            hasOptions={this.state.options.length > 0}
          />
          <div className="widget">
            <Options
              options={this.state.options}
              handleDeleteOptions={this.handleDeleteOptions}
              handleDeleteOption={this.handleDeleteOption}
            />
            <AddOption handleAddOption={this.handleAddOption} />
          </div>
        </div>
        <OptionModal
          selectedOption={this.state.selectedOption}
          handleClearSelectedOption={this.handleClearSelectedOption}
        />
      </div>
    );
  }
}

IndecisionApp.defaultProps = {
  options: [],
};

export default IndecisionApp;
