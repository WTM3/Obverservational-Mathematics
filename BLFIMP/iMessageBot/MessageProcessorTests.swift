import Foundation

func testFoulLanguageFilter() {
    let under18Processor = MessageProcessor(userAge: 12)
    let adultProcessor = MessageProcessor(userAge: 21)
    let testMessage = "This is badword1 and badword2 in a message."

    let filtered = under18Processor.process(message: testMessage)
    let unfiltered = adultProcessor.process(message: testMessage)

    print("Under 18 filtered: \(filtered)")
    print("18+ unfiltered: \(unfiltered)")

    assert(filtered.contains("******"), "Foul words should be filtered for under 18.")
    assert(unfiltered.contains("badword1"), "Foul words should NOT be filtered for 18+.")
}

testFoulLanguageFilter() 