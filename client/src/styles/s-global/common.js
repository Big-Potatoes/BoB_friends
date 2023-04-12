import styled from 'styled-components'
import './variable.css'
// layout
export const OuterWrapper = styled.main`
  width: 100%;
  height: calc(100vh - 50px - 80px);
  overflow: auto;
  padding: 15px 15px;
  margin: 50px 0 0 0;
`

// input
export const InputBase = styled.input`
  width: ${(props) => props.width || '200px'};
  height: 35px;
  border: 1px solid var(--black-100);
  border-radius: 5px;
  padding: 3px;
`
export const InputLabel = styled.label`
  font-weight: var(--fw-bold);
  margin-right: 10px;
  width: 80px;
`

// button
export const ButtonBase = styled.button`
  width: ${(props) => props.width || '150px'};
  margin: ${(props) => props.margin || '0px'};
  min-width: 150px;
  height: 40px;
  font-weight: var(--fw-strong);
  color: white;
  background: var(--yellow-200);
  border-radius: 7px;
  cursor: pointer;
  &:hover {
    background: var(--yellow-100);
    color: var(--black-300);
  }
  &.disabled {
    background: var(--black-100);
    color: var(--black-300);
  }
`
export const ButtonSm = styled.button`
  width: ${(props) => props.width || '80px'};
  min-width: 80px;
  height: 40px;
  font-weight: var(--fw-bold);
  font-size: var(--fz-sm);
  color: white;
  background: var(--yellow-200);
  border-radius: 5px;
  margin: 3px;
  cursor: pointer;
  &:hover {
    background: var(--yellow-100);
    color: var(--black-300);
  }
  &.disabled {
    background: var(--black-100);
    color: var(--black-300);
  }
`
export const ButtonRecharge = styled.button`
  min-width: 65px;
  height: auto;
  border-radius: 3px;
  padding: 3px;
  background: var(--black-100);
  border: 0.5px solid var(--black-200);
  box-shadow: 0px 2px 5px 0px var(--black-100);
  font-size: var(--fz-sm);
  font-weight: var(--fw-bold);
  margin-right: 5px;
  cursor: pointer;
  &:hover,
  &:active {
    background: var(--black-200);
    color: white;
  }
`

// tag
export const Tag = styled.div`
  background: var(--skyblue);
  padding: 3px 7px;
  border-radius: 20px;
  font-size: var(--fz-xs);
  color: white;
  font-weight: var(--fw-bold);
  display: flex;
  justify-content: center;
  align-items: center;
`

// modal
export const ModalWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`
export const ModalBack = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: var(--modalBack);
`
export const ModalContent = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: ${(props) => props.width || '70%'};
  height: ${(props) => props.height || '25%'};
  padding: 10px;
  background: ${(props) => props.bg || 'white'};
  border-radius: 3px;
  z-index: 10;
`
