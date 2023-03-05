import { Component } from 'react'
import { Link } from 'react-router-dom'
import { ContactPreview } from "../cmps/ContactPreview"
import { ContactFilter } from "../cmps/ContactFilter"
import { connect } from 'react-redux'
import { FaUserPlus } from 'react-icons/fa'

import { loadContacts, removeContact, setFilterBy } from '../store/actions/contacts.actions'


class _ContactList extends Component {
    state = {
        selectedContactId: null,
        contacts: null,
        filterBy: { fullname: '' }

    }
    componentDidMount = async () => {
        await this.props.loadContacts()

        this.setState.contacts = this.props.contacts
        this.setState((state, props) => {
            return { contacts: props.contacts }
        })



    }




    onSelectContactId = (contactId) => {
        this.setState({ selectedContactId: contactId })
    }

    onRemoveContact = async (ev, contactId) => {

        ev.preventDefault()
        try {
            await this.props.removeContact(contactId)
        } catch (err) {
            console.log("err:", err)
        }
    }

    onChangeFilter = (filterBy) => {
        this.setState({ filterBy })
        this.props.setFilterBy(filterBy)
        this.props.loadContacts()

    }


    render() {
        const { contacts, filterBy } = this.props

        if (!contacts) return <div>Loading...</div>
        return (
            <section className='contact-list-container flex column auto-center '>
                <section className='flex row gap-rem auto-center'>

                    <ContactFilter
                        onChangeFilter={this.onChangeFilter}
                        filterBy={filterBy}
                    />
                    <Link to="/contact/edit" className='btn-add flex row gap-rem auto-center'><FaUserPlus /></Link>
                </section>
                <section className="contact-list flex row wrap gap-rem align-start justify-center ">
                    {contacts.map(contact =>
                        <Link to={`/contact/${contact._id}`} key={contact._id}>
                            <ContactPreview
                                contact={contact}
                                onRemoveContact={this.onRemoveContact}
                            />
                        </Link>
                    )}

                </section>
            </section>
        )
    }
}

const mapStateToProps = state => ({
    contacts: state.contactModule.contacts,
    filterBy: state.contactModule.filterBy,
})

const mapDispatchToProps = {
    loadContacts,
    removeContact,
    setFilterBy,
}

export const ContactList = connect(mapStateToProps, mapDispatchToProps)(_ContactList)