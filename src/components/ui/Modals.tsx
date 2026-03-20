import Button from "../utils/buttons/Button";
import succesIco from '../../assets/success.jpg';
import failureIco from '../../assets/failure.jpg';
import infoIco from '../../assets/info.png';

interface ModalProps {
    isOpen: boolean,
    title: string,
    message: string,
    type: string,
    onClose: () => void
}

function Modal({ isOpen, title, message, type, onClose }:ModalProps){
    if(!isOpen) return "";

    return (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] flex items-center justify-center z-50">
            <div className="bg-white rounded-lg w-100 h-50">
                <div className="bg-gray-200 rounded-lg">
                    <h4 className="text-center">{title}</h4>
                </div>
                <div className="flex flex-col">
                    {type=="success"?<img className="rounded-full w-25 h-25 mx-auto" src={succesIco} alt="correcto" />:''}
                    {type=="failure"?<img className="rounded-full w-20 h-20 mx-auto" src={failureIco} alt="correcto" />:''}
                    {type=="info"?<img className="rounded-full w-25 h-25 mx-auto" src={infoIco} alt="correcto" />:''}
                    {message}
                    <Button
                        text="cerrar"
                        action={onClose}
                        submit={false}
                        styles="bg-blue-500 rounded-sm text-white p-1 max-w-25 mx-auto"
                    />
                </div>
            </div>
        </div>
    );
}

export default Modal;