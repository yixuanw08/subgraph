/* eslint-disable prefer-const */
import { BigInt } from "@graphprotocol/graph-ts";
import { User } from "../generated/schema";
import { Transfer } from "../generated/Transfer/USDT";

// export function handleTransfer(event: Transfer): void {
//   let user = User.load(event.params.from.toHexString());//But before we create a new User object with the given address, we need to check if the user already exists.the load method accepts the unique ID for the entity.
//   if (user == null) {
//     user = new User(event.params.from.toHexString());
//     user.totalTransfers = BigInt.fromI32(0);
//     user.totalAmount = BigInt.fromI32(0);
//   }

//   user.totalTransfers = user.totalTransfers.plus(BigInt.fromI32(1));
//   user.totalAmount = user.totalAmount.plus(event.params.value);

//   user.save();

// }

const BI_ONE = BigInt.fromI32(1);
export function handleTransfer(event: Transfer): void {
  let transfer = User.load(event.transaction.hash.toHex());
  if (transfer == null) transfer = new User(event.transaction.hash.toHex());//if not existed create a new

  transfer.block = event.block.number;
  transfer.from = event.params._from.toHex();
  transfer.to = event.params._to.toHex();
  transfer.amount = event.params._value;

  transfer.save();
}
