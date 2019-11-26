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
    borderWrap: {
        type: 'number',
        default: 0
    },
    gutter: {
        type: 'string',
        default: '0px',
    },
    textColor: {
        type: 'string',
        default: '',
    },
    wrapTag: {
        type: 'string',
        default: 'div',
    },
    wrapColor: {
        type: 'string',
        background: '#ffffff',
    },
    wrapBackgoundSize: {
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
        type: 'number'
    },
    imgAlt: {
        type: 'string',
        default: ''
    },
};

export default attributes;