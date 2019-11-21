TODO

Tidy up
- add older gallery
- readme
- get off hobby Dyno
- responsive gallery

Form input
- update SS to change filled = FALSE to TRUE on submit
- Style form
- Add a remove/delete option

SpreadsheetRow
Represents a single row from a sheet.

These are returned from calling GoogleSpreadsheet.getRows and SpreadsheetWorksheet.getRows.

You can treat the row as a normal javascript object. Object keys will be from the header row of your sheet, however the google API mangles the names a bit to make them simpler. It's easiest if you just use all lowercase keys to begin with.

See limitations above for notes about Google's row-based API!

SpreadsheetRow.save( callback )
Saves any changes made to the row's values.

SpreadsheetRow.del( callback )
Deletes the row from the sheet.

Warnings that might need dealing with: 

A cookie associated with a cross-site resource at http://rhs.org.uk/ was set without the `SameSite` attribute. A future release of Chrome will only deliver cookies with cross-site requests if they are set with `SameSite=None` and `Secure`. You can review cookies in developer tools under Application>Storage>Cookies and see more details at https://www.chromestatus.com/feature/5088147346030592 and https://www.chromestatus.com/feature/5633521622188032.


The connection used to load resources from https://apps.rhs.org.uk used TLS 1.0 or TLS 1.1, which are deprecated and will be disabled in the future. Once disabled, users will be prevented from loading these resources. The server should enable TLS 1.2 or later. See https://www.chromestatus.com/feature/5654791610957824 for more information.