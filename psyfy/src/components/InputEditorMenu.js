import React from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ItalicIcon from '@material-ui/icons/FormatItalic';
import BoldIcon from '@material-ui/icons/FormatBold';
import UnderlineIcon from '@material-ui/icons/FormatUnderlined';
import BulletIcon from '@material-ui/icons/FormatListBulleted';
import FontIcon from '@material-ui/icons/FormatSize';
import ArrowDownIcon from '@material-ui/icons/ArrowDropDown';
import LeftAlignIcon from '@material-ui/icons/FormatAlignLeft';
import CenterAlignIcon from '@material-ui/icons/FormatAlignCenter';
import RightAlignIcon from '@material-ui/icons/FormatAlignRight';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Utils from '../assets/js/Utils';


class InputEditorMenu extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            fontSize: undefined
        }
    }

    componentDidMount = () => {
        this.props.editor_element.onfocus = document.onselectionchange = e => {
            this.refs.boldEditor.classList.toggle('active-editor', document.queryCommandState('bold'));
            this.refs.italicEditor.classList.toggle('active-editor', document.queryCommandState('italic'));
            this.refs.underlineEditor.classList.toggle('active-editor', document.queryCommandState('underline'));
            this.refs.bulletEditor.classList.toggle('active-editor', document.queryCommandState('insertUnorderedList'))
            this.refs.leftEditor.classList.toggle('active-editor', document.queryCommandState('justifyLeft'))
            this.refs.centerEditor.classList.toggle('active-editor', document.queryCommandState('justifyCenter'))
            this.refs.rightEditor.classList.toggle('active-editor', document.queryCommandState('justifyRight'))
            let fontSize = Math.ceil(document.queryCommandValue("FontSize") * 3.5)
            this.setState({ fontSize })
        }
    }

    componentWillUnmount = () => {
        this.props.editor_element.onfocus = document.onselectionchange = e => null;
    }

    toggleEditor = (editor_element, type) => {
        editor_element = Utils.getButtonParent(editor_element)
        document.execCommand(type, false, null)
        editor_element.classList.toggle('active-editor', document.queryCommandState(type))
    }

    render() {
        return (
            <div className="flex-column">
                <span className="justify-start">
                    <ButtonGroup size="small" aria-label="small outlined button group">
                        <Button
                            style={{ outline: 'none' }}
                            color="default"
                            ref="italicEditor"
                            startIcon={<ItalicIcon />}
                            onClick={e => this.toggleEditor(e.target, 'italic')}
                        >
                            Italic
                        </Button>
                        <Button
                            style={{ outline: 'none' }}
                            color="default"
                            ref="boldEditor"
                            startIcon={<BoldIcon />}
                            onClick={e => this.toggleEditor(e.target, 'bold')}
                        >
                            Bold
                        </Button>
                        <Button
                            style={{ outline: 'none' }}
                            ref="underlineEditor"
                            startIcon={<UnderlineIcon />}
                            onClick={e => this.toggleEditor(e.target, 'underline')}
                        >
                            Underline
                        </Button>
                    </ButtonGroup>
                    <ButtonToolbar>
                        <OverlayTrigger
                            placement={'top'}
                            overlay={
                                <Tooltip>
                                    <strong>Tip:&nbsp;</strong>
                                    Highlight the text, <i>then</i> apply effect you want (e.g bold).
                                </Tooltip>
                            }
                        >
                            <img
                                height="18" width="18"
                                style={{ position: 'relative', top: 5 }}
                                src={require('../assets/images/blue_question_mark.png')}
                            />
                        </OverlayTrigger>
                    </ButtonToolbar>
                </span>
                <ButtonGroup size="small" aria-label="small outlined button group">
                    <Button
                        ref='bulletEditor'
                        onClick={e => this.toggleEditor(e.target, 'insertUnorderedList')}
                        style={{ outline: 'none' }}
                        color="default"
                        startIcon={<BulletIcon />}
                    >
                        Bullet
                    </Button>
                    <Button
                        ref='leftEditor'
                        onClick={e => this.toggleEditor(e.target, 'justifyLeft')}
                        style={{ outline: 'none' }}
                        color="default"
                        startIcon={<LeftAlignIcon />}
                    >
                        Left
                    </Button>
                    <Button
                        ref='centerEditor'
                        onClick={e => this.toggleEditor(e.target, 'justifyCenter')}
                        style={{ outline: 'none' }}
                        color="default"
                        startIcon={<CenterAlignIcon />}
                    >
                        Center
                    </Button>
                    <Button
                        ref='rightEditor'
                        onClick={e => this.toggleEditor(e.target, 'justifyRight')}
                        style={{ outline: 'none' }}
                        color="default"
                        startIcon={<RightAlignIcon />}
                    >
                        Right
                    </Button>
                </ButtonGroup>
                <span className="w200">
                    <PopupState variant="popover" popupId="demo-popup-menu">
                        {popupState => (
                            <React.Fragment>
                                <Button
                                    style={{ outline: 'none' }}
                                    variant='text'
                                    color="default"
                                    startIcon={<FontIcon />}
                                    endIcon={<ArrowDownIcon />}
                                    {...bindTrigger(popupState)}
                                >
                                    Font Size:&nbsp;{this.state.fontSize}
                                </Button>
                                <Menu {...bindMenu(popupState)}>
                                    {[...Array(7).keys()].map(i => {
                                        return (
                                            <MenuItem
                                                key={i}
                                                onClick={() => {
                                                    document.execCommand('fontSize', false, i + 1);
                                                    let fontSize = Math.ceil(document.queryCommandValue("FontSize") * 3.5)
                                                    this.setState({ fontSize })
                                                    popupState.close();
                                                }}>
                                                {Math.ceil((i + 1) * 3.5)}
                                            </MenuItem>
                                        )
                                    })}
                                </Menu>
                            </React.Fragment>
                        )}
                    </PopupState>
                </span>
            </div >
        )
    }
}


export default InputEditorMenu;