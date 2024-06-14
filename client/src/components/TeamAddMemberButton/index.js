import Button from '@material-ui/core/Button';

function TeamAddMemberButton(props) {
    const { style, variant, onClick } = props;

    return(
    <Button variant={variant} color="primary" onClick={onClick} style={style}> Add Member</Button>
    )
}
export default(TeamAddMemberButton);

