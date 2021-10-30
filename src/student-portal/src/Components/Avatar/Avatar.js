import './Avatar.css';

function Avatar(props) {
    return(
        <>
            <div className="avatar">
                {props.firstName.charAt(0).toUpperCase()}{props.lastName.charAt(0).toUpperCase()}
            </div>
        </>
    );
}

export default Avatar;