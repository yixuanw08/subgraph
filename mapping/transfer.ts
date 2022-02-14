/* eslint-disable prefer-const */
import { User } from "../generated/schema";
import { Transfer } from "../generated/Transfer/USDT";

export function handleTransfer(event: Transfer): void {
  let transfer = User.load(event.transaction.hash.toHex());
  if (transfer == null) transfer = new User(event.transaction.hash.toHex());//if not existed create a new

  transfer.block = event.block.number;
  transfer.from = event.params._from.toHex();
  transfer.to = event.params._to.toHex();
  transfer.amount = event.params._value;

  transfer.save();
}