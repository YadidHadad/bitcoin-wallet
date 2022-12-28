import { Component } from 'react'
import { saveContact } from '../store/actions/contacts.actions'
import { contactService } from '../services/contact.service'
import { connect } from 'react-redux'



class _ContactEdit extends Component {
    state = {
        contact: null,

    }

    componentDidMount() {
        if (!this.props.match.params.id) {
            const contact = contactService.getEmptyContact()
            this.setState({ contact })
            return
        }

        this.loadContact()


    }

    async loadContact() {
        const contact = await contactService.getContactById(this.props.match.params.id)
        this.setState({ contact })
    }

    handleChange = ({ target }) => {
        const field = target.name
        let value = target.value

        this.setState(prevState => ({ contact: { ...prevState.contact, [field]: value } }))

    }

    onSaveContact = async (ev) => {
        ev.preventDefault()
        try {
            this.props.saveContact(this.state.contact)
            this.props.history.push(`/contact/${this.state.contact._id}`)
        } catch (err) {
            console.log(err)
        }
    }
    onRemoveContact = async (ev, contactId) => {
        ev.preventDefault()
        try {
            await contactService.removeContact(contactId)
            this.props.history.push('/')
        } catch (err) {
            console.log(err)
        }
    }

    render() {
        const { contact } = this.state
        if (!contact) return
        const { fullname, email, phone } = contact
        return (
            <section className='contact-edit flex column gap-rem align-center'>
                <h1>{contact._id ? 'Edit Contact' : 'Add Contact'}</h1>
                <form className='flex column gap-rem' onSubmit={this.onSaveContact}>
                    <label htmlFor="fullname" ></label>
                    <input type="text" name="fullname" id="fullname" value={fullname} onChange={this.handleChange} placeholder='Enter fullname:' />
                    <label htmlFor="email" ></label>
                    <input type="text" name="email" id="email" value={email} onChange={this.handleChange} placeholder='Enter Email:' />
                    <label htmlFor="phone"></label>
                    <input type="text" name="phone" id="phone" value={phone} onChange={this.handleChange} placeholder='Enter phone:' />

                    <section className='flex row gap-rem justify-between'>
                        <button>Save</button>
                        {contact._id && <button onClick={(event) => this.onRemoveContact(event, contact._id)}>Delete</button>}
                    </section>
                </form>

            </section>
        )
    }
}
const mapStateToProps = state => ({
    contacts: state.contactModule.contacts,
})

const mapDispatchToProps = {
    saveContact,
}

export const ContactEdit = connect(mapStateToProps, mapDispatchToProps)(_ContactEdit)