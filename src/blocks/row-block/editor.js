//Import icons layout

// Setup the block
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const {
    Button,
    ButtonGroup,
} = wp.components;

export default class rowEditor extends Component {
    render(){
        return[
            <div className='ub-sections-block-wrap'>
               <Button isSmall>
                   'Row one'
               </Button>
            </div>
        ]
    }
}