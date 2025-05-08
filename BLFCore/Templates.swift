import Foundation

struct MessageTemplates: Codable {
    let birthday: [String: String]
    let getWell: [String: String]
    let congratulations: [String: String]
    let checkIn: [String: String]
}

class TemplateLoader {
    static let shared = TemplateLoader()
    private(set) var templates: MessageTemplates?

    private init() {
        loadTemplates()
    }

    private func loadTemplates() {
        guard let url = Bundle.main.url(forResource: "templates", withExtension: "json", subdirectory: "Resources") else {
            print("Could not find templates.json")
            return
        }
        do {
            let data = try Data(contentsOf: url)
            let decoder = JSONDecoder()
            templates = try decoder.decode(MessageTemplates.self, from: data)
        } catch {
            print("Error loading templates: \(error)")
        }
    }

    func template(for type: String, branch: String) -> String? {
        switch type {
        case "birthday":
            return templates?.birthday[branch]
        case "getWell":
            return templates?.getWell[branch]
        case "congratulations":
            return templates?.congratulations["default"]
        case "checkIn":
            return templates?.checkIn["default"]
        default:
            return nil
        }
    }
} 