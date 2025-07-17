import stateService from "../../stateManagement/StateService"

const removeChallenge = (challengerUserId: string, challengeRecipientUserId: string) => {

    const { updateState } = stateService

    const currentChallenges = stateService.state.myChallengesState.challenges

    const updatedChallenges = currentChallenges.filter((challenge: any) => {
        return challenge.challengerUserId !== challengerUserId
            && challenge.challengeRecipientUserId !== challengeRecipientUserId
    })

    updateState("myChallengesState", [
        { key: "challenges", value: updatedChallenges }
    ])
}

export default removeChallenge