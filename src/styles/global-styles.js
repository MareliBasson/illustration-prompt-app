import { createGlobalStyle } from 'styled-components'
import { tokens } from './tokens'
export const GlobalStyles = createGlobalStyle`
    html,
    body,
    #root {
        height: 100%;
        background-color: ${tokens.colorPrimary};
        color: white;
        font-family: ${tokens.fontPrimary};
        font-size: 16px;
    }

    body {
        margin: 0;
        padding: 0;
        font-family: ${tokens.fontPrimary};

        * {
            box-sizing: border-box;
        }
    }

    h1,
    h2,
    h3,
    h4,
    h5 {
        margin: 0;
        padding: 0;
    }

    input,
    button {
        outline: none;

        &:hover,
        &:focus {
            outline: none;
        }
    }
    
    button,
    input,
    optgroup,
    select,
    textarea {
        font-family: inherit; /* 1 */
        font-size: 100%; /* 1 */
        line-height: 1.15; /* 1 */
        margin: 0; /* 2 */
    }
    
    input[type='text'] {
        border: none;
        background-color: white;
        border-radius: 3px;
        padding: 5px 10px;
        height: 38px;
    }

    input[type='file'] {
		position: absolute;
		z-index: 1;
		top: 6px;
		left: $file-btn-width + $file-btn-buffer - 70px;
		font-size: 15px;
		color: rgb(153, 153, 153);
	}
    
`
