const attributes = {
    blockID: {
        type: 'string',
        default: ''
    },
    colSection: {
        type: 'string',
        default: '',
    },
    columns: {
        type: 'number',
        default: 1,
    },
    inspectorTypeColumn: {
        type: 'bool',
        default: false
    },
    blockAlignment: {
        type: 'string',
        default: 'none',
    },
    ColWidthOne: {
        type: 'string',
        default: '',
    },
    ColWidthTwo: {
        type: 'string',
        default: '',
    },
    ColWidthThree: {
        type: 'string',
        default: '',
    },
    ColWidthFour: {
        type: 'string',
        default: '',
    },
    ColWidthFive: {
        type: 'string',
        default: '',
    },
    ColWidthSix: {
        type: 'string',
        default: '',
    },
    startOptions: {
        type: 'bool',
        default: true,
    },
    selectUnits: {
        type: 'string',
        default: 'px',
    },
    marginTopWrap: {
        type:'number',
        default: 0,
    },
    marginBottomWrap: {
        type:'number',
        default: 0,
    },
    marginRightWrap: {
        type:'number',
        default: 0,
    },
    marginLeftWrap: {
        type:'number',
        default: 0,
    },
    paddingTopWrap: {
        type:'number',
        default: 0,
    },
    paddingBottomWrap: {
        type:'number',
        default: 0,
    },
    paddingRightWrap: {
        type:'number',
        default: 0,
    },
    paddingLeftWrap: {
        type:'number',
        default: 0,
    },
    gutter: {
        type: 'string',
        default: '0px',
    },
    wrapTag: {
        type: 'string',
        default: 'div',
    },
    wrapBorderStyle: {
        type: 'string',
        default: 'solid',
    },
    wrapBorderSize: {
        type: 'number',
        default: 0,
    },
    wrapBorderRadius: {
        type: 'number',
        default: 0,
    },
    wrapBorderColor: {
        type: 'string',
        default: '#ffffff',
    },
    wrapColor: {
        type: 'string',
        background: '#ffffff',
    },
    wrapBackgroundSize: {
        type: 'string',
        default: 'cover',
    },
    wrapBackgroundPosition: {
        type: 'string',
        default: 'center center',
    },
    wrapBackgroundRepeat: {
        type: 'string',
        default: 'no-repeat',
    },
    wrapBackgroundAttachment: {
        type: 'string',
        default: 'scroll',
    },
    imgURL: {
        type: 'string',
        default: ''
    },
    imgID: {
        type: 'number',
    },
    imgAlt: {
        type: 'string',
        default: ''
    },
    videoURL: {
        type: 'string',
        default: '',
    },
    videoID: {
        type: 'number',
    },
    videoMuted: {
        type: 'bool',
        default: true,
    },
    videoLoop: {
        type: 'bool',
        default: true,
    },
    wrapBackgroundOverlay: {
        type: 'number',
        default: 0,
    },
    wrapBackgroundOverlayCol: {
        type: 'string',
        default : '#ffffff',
    },
    textColor: {
        type: 'string',
        default: '',
    },
};

export default attributes;