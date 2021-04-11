
const Modal = props => {
    const { isModalOpen, closeModal, children } = props;
	
    return (
        <div className='outerStyle' style={{display: isModalOpen ? 'block' : 'none'}}>
            <div className='overlay' onClick={closeModal} />
            <div onClick={closeModal} />
            <div className='modal'> {children} </div>
        </div>
    );
}

export default Modal;