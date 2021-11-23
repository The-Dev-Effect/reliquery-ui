from setuptools import find_packages, setup

install_requires = [
    "reliquery >= 0.2.9",
    "numpy >= 1.16",
    "black>=21.4b",
    "fastapi[all]",
    "requests",
    "uvicorn",
]


setup(
    name="reliquery_ui",
    version="0.2.3 ",
    description="Science's Artifact Antiformat",
    url="https://github.com/The-Dev-Effect/reliquery-ui",
    author="The Dev Effect",
    author_email="company@thedeveffect.com",
    license="MIT OR Apache-2.0",
    packages=["reliquery_ui", "reliquery_ui/routers"],
    package_data={"reliquery_ui": ["../frontend/dist/*"]},
    tests_require=["pytest"],
    install_requires=install_requires,
    scripts=["bin/reliquery-ui"],
)
