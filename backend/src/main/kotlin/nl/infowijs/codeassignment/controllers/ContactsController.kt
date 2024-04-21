package nl.infowijs.codeassignment.controllers

import io.vertx.core.json.JsonArray
import io.vertx.ext.web.RoutingContext
import nl.infowijs.codeassignment.data.Contacts
import nl.infowijs.codeassignment.modules.WebResponse

class ContactsController {
  val contacts = Contacts.Companion.getContacts()
  
  fun listContacts(routingContext: RoutingContext) {
    val contactSortedByLastName = contacts.sortedBy { it.lastname.uppercase() }
    val contactsJson = JsonArray(contactSortedByLastName.map { it.toJsonObject() });

    WebResponse(routingContext).end(contactsJson)
  }
}
