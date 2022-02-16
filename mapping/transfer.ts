/* eslint-disable prefer-const */
import { User } from "../generated/schema";
import { Transfer } from "../generated/Transfer/ERC20";
import { BigInt, Address, log } from "@graphprotocol/graph-ts";

function loadOrCreateAccount(address: string): User {
  let account = User.load(address);
  if (account == null) {
    account = new User(address);
    account.amount = BigInt.fromI32(0);
  }
  return account as User;
}

export function handleTransfer(event: Transfer): void {
  // let transfer = User.load(event.transaction.hash.toHex());
  // if (transfer == null) transfer = new User(event.transaction.hash.toHex());//if not existed create a new

  // transfer.block = event.block.number;
  // transfer.from = event.params.from.toHex();
  // transfer.to = event.params.to.toHex();
  // transfer.amount = event.params.value;

  // transfer.save();

  let addressFrom = event.params.from.toHexString(); //receive event assign to entity
  let addressTo = event.params.to.toHexString();
  let value = event.params.value;
  let block = event.block.number;

  let isMinting = addressFrom == "0x0000000000000000000000000000000000000000";
  let isBurning = addressTo == "0x0000000000000000000000000000000000000000";

  log.debug("addressFrom: {}", [addressFrom]);
  log.debug("addressTo: {}", [addressTo]);


  if (!isMinting) {//source
    let accountFrom = loadOrCreateAccount(addressFrom);
    accountFrom.amount = accountFrom.amount.minus(value);
    accountFrom.save();
  }

  if (!isBurning) {//destination
    let accountTo = loadOrCreateAccount(addressTo);
    accountTo.amount = accountTo.amount.plus(value);
    accountTo.save();
  }
}