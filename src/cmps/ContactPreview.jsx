import { FaBtc } from 'react-icons/fa';


export function ContactPreview({
  contact,
  onRemoveContact,
}) {

  const style = { backgroundImage: `url(${contact.imgUrl})` }

  return (

    <section className="contact-preview" >
      <section className="info flex gap-rem">
        {/* {contact.imgUrl ? <img
          className="user-img"
          src={contact.imgUrl}
          alt=""
        />
          :
          <img
            className="user-img"
            src={require("../assets/imgs/user.png")}
            alt=""
          />} */}
        <div className="img " style={style}></div>
        <div className="flex column auto-center" >
          <span>{contact.fullname}</span>
          <span>{contact.phone}</span>
          <span className='flex row align-center'>Btc balance: {contact.balance}<FaBtc /></span>
        </div>
      </section>
      <button className="remove-btn" onClick={(event) => onRemoveContact(event, contact._id)}>X</button>
    </section>
  );
}
