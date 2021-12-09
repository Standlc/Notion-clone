import styled from "styled-components";

export const Function = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  visibility: hidden;
  margin-right: 2px;
  color: rgba(255, 255, 255, 0.3);
  border-radius: 5px;
  &:hover {
    background-color: rgb(5, 10, 15);
  }
  cursor: pointer;
`;
export const Triangle = styled.div<{ showList: Boolean }>`
  margin: 0 5px;
  color: rgba(255, 255, 255, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  cursor: pointer;
  transform: ${(props) => (props.showList ? "rotate(90deg)" : "rotate(0)")};
  transition: transform 200ms;
`;
export const InputLine = styled.div<{ padding: string; fontSize: string }>`
  white-space: pre-wrap;
  word-break: break-word;
  padding: ${(props) => props.padding};
  font-size: ${(props) => props.fontSize};
  border-radius: 5px;
  color: white;
  font-weight: 300;
  background-color: transparent;
  transition: background-color 100ms;
  flex: 1;
  &:focus {
    outline: none;
  }
  &:hover {
    background-color: rgb(5, 10, 15);
  }
`;
export const ListContainer = styled.div`
  padding: 10px 10px 10px 0px;
  width: 100%;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  border-radius: 5px;
  transition: background-color 100ms;
  &:hover {
    background-color: rgb(5, 10, 15);
  }
`;
export const DividerWrapper = styled.div<{ elementIsSelected: boolean }>`
  display: flex;
  align-items: center;
  width: 100%;
  border-radius: 5px;
  padding: 7px 7px;
  background-color: ${(props) =>
    props.elementIsSelected ? "rgba(46, 170, 220, 0.2)" : "transparent"};
  transition: background-color 100ms;
`;
export const DividerInput = styled.div`
  position: absolute;
  top: 0;
  z-index: -5;
  :focus {
    outline: none;
  }
`;
export const Divider = styled.div`
  height: 1px;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.2);
`;
export const Wrapper = styled.div`
  position: relative;
  width: 100%;
  margin: 2px 0;
  display: flex;
  align-items: center;
  &:hover ${Function} {
    visibility: visible;
  }
`;
export const Image = styled.img`
  width: 100%;
  border-radius: 5px;
  object-fit: contain;
`;
export const ImageInput = styled.label`
  padding: 7px;
  width: 100%;
  background-color: rgb(20, 30, 37);
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: start;
  transition: background-color 100ms;
  color: gray;
  &:hover {
    background-color: rgb(27, 40, 49);
  }
`;
