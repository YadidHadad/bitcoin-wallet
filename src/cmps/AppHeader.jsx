import { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { FaBitcoin } from 'react-icons/fa';
import { FaHome } from 'react-icons/fa';
import { FaAddressBook } from 'react-icons/fa';
import { FaChartLine } from 'react-icons/fa';

export class AppHeader extends Component {
    render() {
        return (
            <header className="app-header">
                <section className="container  flex row justify-between ">
                    <div className='logo flex row gap-rem auto-center'>
                        <FaBitcoin />
                        <h1>Bitcoin Wallet</h1>
                    </div>
                    <nav className='flex   gap-rem'>



                        <NavLink exact to="/"><FaHome /></NavLink>
                        <NavLink to="/contact"><FaAddressBook title="contacts" /></NavLink>
                        <NavLink to="/chart"><FaChartLine title="statistics" /></NavLink>
                    </nav>
                </section>

            </header>
        )
    }
}
