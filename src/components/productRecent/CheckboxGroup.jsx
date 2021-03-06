import React, { Component } from "react";
import styled, { css } from "styled-components";
import CheckBox from "components/productRecent/CheckBox";

class CheckboxGroup extends Component {
  render() {
    const { show, brand, filter, onChange } = this.props;

    return (
      <Wrapper show={show}>
        <CheckBox
          value="전체"
          checked={filter.length === brand.length}
          onChange={(e) => (e.target.checked ? onChange([...brand]) : onChange([]))}
        />

        {brand.map((name, idx) => (
          <CheckBox
            key={`brand${idx}`}
            value={name}
            checked={filter?.includes(name)}
            onChange={(e) => {
              if (e.target.checked) {
                onChange([...filter, name]);
              } else {
                filter.length === brand.length
                  ? onChange([name])
                  : onChange(filter.filter((opt) => opt !== name));
              }
            }}
          />
        ))}
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  display: none;
  height: 40px;
  border-top: 1px solid ${({ theme }) => theme.color.borderline};
  border-bottom: 1px solid ${({ theme }) => theme.color.borderline};

  ${({ show }) =>
    show &&
    css`
      display: flex;
      align-items: center;
      justify-content: flex-start;
    `};

  label + label {
    margin-left: 2px;
  }
`;

export default CheckboxGroup;
