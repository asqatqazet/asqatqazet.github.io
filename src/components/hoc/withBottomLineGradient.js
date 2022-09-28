const withBottomLineGradient = (Container) => {
    return (props) => {
        return <div>
            <Container {...props}/>
            <div style={
                {
                    height: `2px`,
                    background: `linear-gradient(90deg, rgba(255, 23, 228, 1) 0%, rgba(134,251,251,1) 100%)`
                }
            }
            ></div>
        </div>
    }
}

export default withBottomLineGradient