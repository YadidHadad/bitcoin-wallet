import { Component } from 'react'
import { Link } from 'react-router-dom'
import { contactService } from '../services/contact.service'
import { userService } from '../services/user.service'
import { FaBitcoin } from 'react-icons/fa'
import { FaBtc } from 'react-icons/fa'
import { TransferFund } from '../cmps/TransferFund'
import { MovesList } from '../cmps/MovesList'

import { FaUserEdit } from 'react-icons/fa'


export class ContactDetails extends Component {

    state = {
        contact: null,
        nextId: null,
        prevId: null,
        loggedinUser: null
    }

    componentDidMount() {
        this.getUser()
        this.loadContact()
        this.nextId()
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.match.params.id !== this.props.match.params.id) {
            this.loadContact()
            this.nextId()

        }
    }

    getUser() {
        const loggedinUser = userService.getLoggedInUser()
        this.setState({ loggedinUser })
    }
    async loadContact() {
        const contact = await contactService.getContactById(this.props.match.params.id)
        this.setState({ contact })
    }

    async nextId() {
        const nextId = await contactService.getNextContactById(this.props.match.params.id, 'next')
        const prevId = await contactService.getNextContactById(this.props.match.params.id, 'back')
        this.setState({ nextId, prevId })
    }

    onTransferCoins = (amount) => {
        const user = userService.addMove(this.state.contact, amount)
        this.setState({ loggedinUser: user })
    }

    get movesToContact() {
        let moves = this.state.loggedinUser.moves.filter(
            (move) => {
                return move.to._id === this.state.contact._id
            }
        )
        return !moves.length ? null : moves
    }


    render() {
        const { loggedinUser, contact, nextId, prevId } = this.state
        if (!contact) return <div className="loader flex auto-center"><FaBitcoin /></div>

        console.log(`contact:`, contact)
        const style = { backgroundImage: `url(${contact.imgUrl})` }

        if (!contact && !nextId && !prevId) return <div>Loading...</div>
        return (
            <section className="contact-details flex column auto-center gap-2rem">
                <section className='contact-header flex row gap-2rem auto-center'>
                    <div className="img " style={style}>
                        <Link className='edit-contact flex  auto-center ' to={`/contact/edit/${contact._id}`}><FaUserEdit /></Link>

                    </div>
                    <section>
                        <h3>Name: {contact.fullname}</h3>
                        <h3>Email: {contact.email}</h3>
                        <h3>Phone: {contact.phone}</h3>
                        <h3 className="flex row align-center">Balance: {contact.balance}<FaBtc /></h3>
                    </section>
                </section>

                <section className='contact-actions flex row gap-2rem align-start justify-center'>
                    {this.movesToContact && (
                        <MovesList
                            title={`Past transactions to ${contact.fullname}`}
                            movesList={this.movesToContact}
                        />
                    )}
                    {loggedinUser && (
                        <TransferFund
                            contact={contact}
                            maxCoins={loggedinUser.balance}
                            onTransferCoins={this.onTransferCoins}
                        />
                    )}

                </section>
                <section className='flex row gap-rem'>
                    <Link to={`/contact/${nextId}`}>Next Contact</Link>
                    <Link to={`/contact/${prevId}`}>Previous Contact</Link>
                </section>
            </section >
        )
    }
}
