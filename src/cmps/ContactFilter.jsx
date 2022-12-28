import { Component, createRef } from 'react'

export class ContactFilter extends Component {

    state = {
        filterBy: { fullname: '' }
    }

    typeInputRef = createRef()

    componentDidMount() {
        const { filterBy } = this.props
        this.setState({ filterBy: { ...filterBy } })
    }

    // handleRef = (elInput) => {
    //     elInput?.focus()
    // }

    handleChange = ({ target }) => {
        const field = target.name
        let value = target.value

        this.setState(
            (prevState) => ({ filterBy: { ...prevState.filterBy, [field]: value } }),
            () => this.props.onChangeFilter({ ...this.state.filterBy })
        )
    }

    render() {
        const { filterBy } = this.state
        if (!filterBy) return <div>Loading...</div>

        const { fullname } = filterBy
        return (
            <form className='contact-filter flex column grow auto-center'>
                <section className='flex column grow'>
                    {/* <label htmlFor="fullname">Name</label> */}
                    <input ref={this.handleRef} onChange={this.handleChange} value={fullname} type="text" name="fullname" id="name" placeholder='Filter by name' />
                </section>
            </form>
        )
    }
}
