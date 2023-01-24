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
		left: ${tokens.fileButtonWidth} + ${tokens.fileButtonBuffer} - 70px;
		font-size: 15px;
		color: rgb(153, 153, 153);
	}

    .btn {
        border: none;
        border-radius: 3px;
        line-height: 1.3rem;
        cursor: pointer;
        display: inline-block;

        &.btn-primary {
            background-color: white;
            color: ${tokens.colorPrimary};
            padding: 5px 10px;
            min-width: 80px;
        }

        &.btn-confirm {
            background-color: ${tokens.colorGreen};
            color: white;
            padding: 5px 10px;
            min-width: 80px;

            &:hover {
                background-color: darken(${tokens.colorGreen}, 10%);
            }
        }

        &.btn-destruct {
            background-color: ${tokens.colorRed};
            color: white;
            padding: 5px 10px;
            min-width: 80px;

            &:hover {
                background-color: darken(${tokens.colorRed}, 10%);
            }
        }

        &.btn-in-form {
            padding: 9px 10px;
        }

        &.btn-icon {
            border: none;
            background: none;
            color: white;
            margin-left: 10px;

            &:hover {
                color: ${tokens.colorRed};
            }

            i {
                cursor: pointer;
            }
        }

        &:disabled {
            background-color: ${tokens.colorGrey};
            opacity: 0.8;
            pointer-events: none;
        }
    }
    
`
