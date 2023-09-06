import styled from '@emotion/styled';

export const PopCoverMakerContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 100px;
  & >canvas {
    border: 1px solid lightgray;
  }
  button, span.btn {
    display: inline-block;
    box-sizing: border-box;
    border: 1px solid lightgray;
    padding: 0 6px;
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    color: dimgray;
  }
  input {
    height: 30px;
  }
`;
export const ControllerContainer = styled.div`
  display: flex;
  margin-top: 20px;
  gap: 10px;
  justify-content: space-between;
  label {
    input[type='file'] {
      display: none;
    }
  }
`;

export const PreviewImage = styled.div`
  margin-top: 20px;
  position: relative;
  width: auto;
  height: auto;
  &:after {
    content: '';
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 65 20' class='place_icon_popular_style' aria-hidden='true'%3E%3Cpath fill='%23EA37A7' opacity='.8' d='M0 0h65v14a6 6 0 01-6 6H0V0z'%3E%3C/path%3E%3Cpath fill='%23FFF' d='M10 4.5c.32.37.82.72 1.44.99a5.13 5.13 0 003.24.42c.1-.03.2-.06.28-.1.09.51 0 2.96 0 3.16 0 1.07-.1 1.99-.28 2.75-.3 1.3-.82 2.16-1.43 2.53A11.96 11.96 0 0110 15.5a15.2 15.2 0 01-1.87-.56 6.54 6.54 0 01-1.4-.7 2.46 2.46 0 01-.78-.85c-.55-.91-.91-2.4-.91-4.42 0-.2-.09-2.65 0-3.15.24.1.56.16.91.18a5.7 5.7 0 002.6-.51A4.18 4.18 0 0010 4.5zm-.63 5.96l-.69.94h-.07a.93.93 0 00-.78.43 1 1 0 000 1.09c.17.26.46.43.78.43s.61-.17.78-.43c.1-.15.16-.34.16-.55a1 1 0 00-.34-.75l.34-.63-.18-.53zM11.7 6.7L9.98 9.45 8.26 6.7l-.05.09a.64.64 0 00-.08.44c.01.16.14.49.2.64l1.02 2.2.33.9h.62V11c.05.05.29.31.46.66a.97.97 0 00-.31.72c0 .2.06.4.16.55.17.26.46.43.78.43s.61-.17.78-.43a1 1 0 000-1.09.93.93 0 00-.9-.42l-.8-1.05v-.02l1.15-2.47c.06-.15.2-.48.2-.64.03-.26-.02-.33-.12-.53zm-3.11 5.24c.24 0 .44.2.44.46s-.2.45-.44.45a.45.45 0 01-.44-.45c0-.25.2-.46.44-.46zm2.82 0c.25 0 .44.2.44.46s-.2.45-.44.45a.45.45 0 01-.44-.45c0-.25.2-.46.44-.46zM10 10.17c.1 0 .2.1.2.2a.2.2 0 01-.2.2.2.2 0 01-.2-.2c0-.11.1-.2.2-.2zm15.3 1.86V5.5h-1.36v6.53h1.36zm-4.8-1.39c1.41 0 2.52-.9 2.52-2.21 0-1.32-1.1-2.22-2.51-2.22S18 7.1 18 8.43c0 1.31 1.1 2.21 2.5 2.21zm0-1.12c-.67 0-1.18-.41-1.18-1.1 0-.68.52-1.11 1.19-1.11.67 0 1.2.43 1.2 1.12 0 .68-.53 1.09-1.2 1.09zm4.99 4.76v-1.04h-5.01v-1.88h-1.36v2.92h6.37zm8.44.22v-9h-1.36v9h1.35zm-6.85-1.56c2.94-1.6 4.02-3.88 4.1-6.51h-4.3v1.09h2.88c-.18 1.73-1.46 3.46-3.44 4.37l.76 1.05zm15.28-2.26l.6-1.08c-1.5-.2-3.15-1.3-3.15-2.94v-.53h-1.45v.53c0 1.65-1.67 2.76-3.16 2.94l.61 1.08c1.16-.23 2.76-1.09 3.26-2.4.51 1.31 2.17 2.18 3.3 2.4zm.83 2.67v-1.06h-8.2v1.06h8.2zm7.53 1.15V9.93h1.2v-1.1h-1.2V5.5h-1.34v9h1.34zm-5.5-2.13c1.34 0 2.61-.1 3.72-.3-.03-.35-.1-.68-.13-1.02-.75.14-2.13.23-3.1.23l-.45-.01V9.75h2.7V8.68h-2.7V7.34h2.84V6.3h-4.18v6.05l1.3.02zm14.53-2.27V5.5h-1.37v4.6h1.36zm-4.83-.1c1.4 0 2.48-.86 2.48-2.1 0-1.24-1.09-2.09-2.48-2.09s-2.46.84-2.46 2.1c0 1.22 1.05 2.08 2.46 2.08zm0-1.07c-.66 0-1.14-.39-1.14-1.03 0-.63.47-1.04 1.14-1.04.65 0 1.16.4 1.16 1.04s-.51 1.03-1.16 1.03zm5.08 5.5v-1.05h-4.98v-.5h4.72v-2.44h-6.06v1.05h4.7v.43h-4.72v2.51H60z'%3E%3C/path%3E%3C/svg%3E");
    background-size: 65px 20px;
    width: 65px;
    height: 20px;
    top: 0;
    left: 0;
    position: absolute;
    z-index: 2;
  }
  & > img {
    width: 100px;
    height: 100px;
  }
`;

export const PreviewImageContainer = styled.div`
  width: 100%;
  margin-top: 20px;
  display: flex;
  justify-content: center;
  & > a {
    position: relative;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    & > button {
      width: 100px;
    }
  }
`;
