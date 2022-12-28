import { withRouter } from 'react-router-dom'
import { FaChevronCircleRight } from 'react-icons/fa'
import { FaChevronCircleLeft } from 'react-icons/fa'

function _AppFooter(props) {
    const { history } = props

    return (
        <footer className='app-footer ' >

            <section className="container flex row justify-between auto-center">

                {/* {<button className='btn btn-circle' disabled={history.action !== 'POP'} onClick={() => {
                    history.goBack()
                }}
                ><FaChevronCircleLeft /></button>} */}
                <div className='flex column auto-center'>

                    <span>
                        Developed by Yadid Hadad
                    </span>
                    <span>
                        &copy; All rights reserved 2022
                    </span>
                </div>

                {/* {<button className='btn btn-circle' disabled={history.action !== 'POP'} onClick={() => {
                    history.goForward()
                }}
                ><FaChevronCircleRight /></button>} */}
            </section>
        </footer>
    )

}

export const AppFooter = withRouter(_AppFooter)