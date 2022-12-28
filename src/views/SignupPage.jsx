import { Component } from 'react'
import { userService } from '../services/user.service'
import { contactService } from '../services/contact.service'
import { connect } from 'react-redux'
import { setUser } from '../store/actions/user.actions'

class _SignupPage extends Component {
    state = {
        fullname: '',


    }

    componentDidMount() {
        const user = contactService.getEmptyContact()
        if (!this.state.fullname) this.setState({ ...user })
    }

    onSignup = async (ev) => {
        ev.preventDefault()
        try {
            await userService.signup(this.state)
            await this.props.setUser()
            this.props.history.push('/')
        } catch (error) {
            console.log('error: ', error)
        }
    }

    onSeeDemo = async (ev) => {
        ev.preventDefault()

        const user = {
            '_id': '6391c850f66d9762b2800e50',
            'fullname': 'Dima Demo',
            'email': 'dima-demo@mystartup.org',
            'isAdmin': false,
            'imgUrl': 'https://res.cloudinary.com/dnznyz6om/image/upload/v1670495585/htkfdnkkhbrxd3nddln7.webp',
            'phone': '+1 (911) 475-2312',
            'balance': 300,
            moves: []
        }
        try {
            await userService.signup(user)
            await this.props.setUser()
            this.props.history.push('/')
        } catch (error) {
            console.log('error: ', error)
        }
    }

    handleChange = ({ target }) => {
        const field = target.name
        let value = target.value
        switch (target.type) {
            case 'number':
            case 'range':
                value = +value
                break
            case 'checkbox':
                value = target.checked
                break
            default:
                break
        }

        this.setState({ [field]: value })
    }

    render() {
        const { fullname } = this.state
        return (
            <section className='signup-page flex column gap-rem auto-center'>
                <h1>You are only one click away!</h1>
                <h1>Start the day with Crypto!</h1>
                <form onSubmit={this.onSignup} className="flex column gap-rem">
                    <input
                        onChange={this.handleChange}
                        type='text'
                        name='fullname'
                        id='fullname'
                        value={fullname}
                        placeholder='insert your name...'
                    />
                    <section className='flex row justify-between gap-rem'>
                        <button>signup</button>
                        <button onClick={this.onSeeDemo}>See demo</button>
                    </section>
                </form>
            </section>
        )
    }
}

const mapStateToProps = state => ({
    loggedInUser: state.userModule.loggedInUser
})

const mapDispatchToProps = {
    setUser
}

export const SignupPage = connect(mapStateToProps, mapDispatchToProps)(_SignupPage)