import {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import actions from '../../../redux/actions/actions'
import { IToken } from '../../../redux/store/token/types'
import { IStore } from '../../../redux/store/types'

const useDispatchUser = () => {
    const {accessToken} = useSelector<IStore, IToken>(store => store.token)
    const dispatch = useDispatch()
    
    useEffect(() => {
        if(accessToken)
            dispatch(actions.userAction(accessToken))
    },[accessToken, dispatch])
}

export default useDispatchUser