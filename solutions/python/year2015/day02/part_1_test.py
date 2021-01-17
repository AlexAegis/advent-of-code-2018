#!/usr/bin/env python3

from aoclib import read_resource

from .part_1 import solve


def test_solve():
    result = solve(read_resource(2015, 2))
    assert result == 1606483
