#!/bin/bash
alembic revision --autogenerate -m "0.0.1"
alembic upgrade head