import styled from "styled-components";

export const ButtonsWrapper = styled.div`
  left: 0px;
  /* transform: translateX(100%); */
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const Function = styled.div`
  left: 0;
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
  /* &:hover {
    background-color: rgb(5, 10, 15);
  } */
`;
export const ListContainer = styled.div`
  padding: 5px 10px 7px 0px;
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
  padding: 5px 7px;
  background-color: ${(props) =>
    props.elementIsSelected ? "rgba(46, 170, 220, 0.2)" : "transparent"};
`;
export const HiddenInput = styled.div`
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
export const Wrapper = styled.div<{ isMouseSelected: boolean }>`
  width: 100%;
  margin: 2px 0;
  display: flex;
  border-radius: 5px;
  align-items: center;
  &:hover ${Function} {
    visibility: visible;
  }
  transition: background-color 300ms;
  background-color: ${(props) =>
    props.isMouseSelected ? "rgba(46, 170, 220, 0.2)" : "transparent"};
`;
export const Image = styled.img`
  width: 100%;
  border-radius: 5px;
  object-fit: contain;
`;
export const DragHandleWrapper = styled.div<{ side: string }>`
  visibility: hidden;
  background-color: rgba(0, 0, 0, 0.5);
  border: solid 1px white;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: col-resize;
  width: 5px;
  height: 150px;
  border-radius: 50px;
  ${(props) => props.side === "left" && "left: 25px;"}
  ${(props) => props.side === "right" && "right: 25px;"}
`;
export const ImageInput = styled.label<{ elementIsSelected: boolean }>`
  padding: 6px;
  width: 100%;
  position: relative;
  background-color: rgb(20, 30, 37);
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: start;
  transition: background-color 100ms, width 100ms;
  color: gray;
  &:hover {
    background-color: rgb(36, 56, 70);
  }
  &:hover ${DragHandleWrapper} {
    visibility: visible;
  }
  background-color: ${(props) =>
    props.elementIsSelected ? "rgba(46, 170, 220, 0.2)" : "rgb(25, 38, 48)"};
`;
