# v1461 candidate document profile section renderer split

v1461 migrates the candidate document intake packet section. The intake packet still reports no reviewed real document, no payload import, no evaluation, and no writes.

The dedicated renderer keeps intake packet fields near the request and material sections that consume the same candidate document chain.
