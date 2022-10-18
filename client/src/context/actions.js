export const actions = (state, dispatch) => ({
    state,
    dispatch,
    setDisplayHelpWidget: (payload, message) => dispatch({ 
        type: 'displayReadingLink', 
        payload,
        message
    }),

    setVideoHelpWidget: (payload, message) => dispatch({ 
        type: 'displayVideo', 
        payload,
        message
    })
})

